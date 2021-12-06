import { Prompt } from 'react-router-dom';
import { Control, useFormState } from 'react-hook-form';
import { FormData } from '../../../features/agent-dashboard/components/AgentDetailForm';

type FormPromptProps = {
    control: Control<FormData> | Control<Partial<FormData>>;
}

export const FormPrompt = ({control}: FormPromptProps): JSX.Element => {
    const { isDirty } = useFormState({control});

    return(
        <>
            <Prompt when={isDirty} message="There are unsaved changes, would you still like to leave?" />
        </>
    )
}