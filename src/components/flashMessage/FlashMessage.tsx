import { FC, useContext } from "react";
import Alert from 'react-bootstrap/Alert';
import { Context as FlashMessageContext } from '../../context/flashMessage.context';


const FlashMessage: FC = () => {
    const { state } = useContext(FlashMessageContext);

    return (
        <>
            { 
                state.flashMessage && 
                    <Alert variant={ state.flashMessage.variant }>{ state.flashMessage.message }</Alert> 
            }
        </>
    )
}

export default FlashMessage;