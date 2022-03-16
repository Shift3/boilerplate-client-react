import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { isErrorAString, isErrorResponse } from 'common/error/utilities';
import { ErrorIndexType } from 'common/models';
import { FC, useState, useEffect, useMemo, useCallback } from 'react';

export type Props = {
  fieldName: string;
  serverError: FetchBaseQueryError | null;
};

export const FormServerError: FC<Props> = ({ fieldName, serverError }) => {

    let errorEntries: ErrorIndexType = useMemo<ErrorIndexType>(() => ({}), []);
    let errorStr = '';
    const errorData = serverError?.data;

    if (errorData && isErrorResponse(errorData)) {
        if (!isErrorAString(errorData.error)) {
            errorEntries = errorData.error;
        } else {
            errorStr = errorData.message;
        }
    }

    const [errorMsg, setErrorMsg] = useState('');

    const isFieldInErrorObj = useCallback(() => {
        return fieldName in errorEntries;
    }, [fieldName, errorEntries]);

    const isFieldPartOfNonEmptyErrorStr = useCallback(() => {
        return errorStr !== '' && errorStr.includes(fieldName);
    }, [errorStr, fieldName]);

    useEffect(() => {
        if (isFieldInErrorObj()) {
            setErrorMsg(errorEntries[fieldName].join(','));
        }
        if (isFieldPartOfNonEmptyErrorStr()) {
            setErrorMsg(errorStr);
        }
    }, [errorEntries, fieldName, errorStr, isFieldInErrorObj, isFieldPartOfNonEmptyErrorStr]);

    return (
        <>
            {isFieldInErrorObj() || isFieldPartOfNonEmptyErrorStr() ? <div role='alert' className='invalid-feedback d-block'>{errorMsg}</div> : null}
        </>
    );
}