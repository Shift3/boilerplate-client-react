import { FC, useContext } from "react";
import Alert from 'react-bootstrap/Alert';
import { Context as FlashMessageContext } from '../../context/flashMessage.context';

const FlashMessage: FC = () => {
    const { flashMessage } = useContext(FlashMessageContext);

    return (
        <>
            { 
                flashMessage && 
                    <Alert variant={ flashMessage.variant }>{ flashMessage.message }</Alert> 
            }
        </>
    )
}

export default FlashMessage;