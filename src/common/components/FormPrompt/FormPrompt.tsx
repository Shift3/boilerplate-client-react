import { Prompt } from "react-router-dom"

type PromptProps = {
    isDirty: boolean;
    isSubmitting: boolean;
}

export const FormPrompt = ({ isDirty, isSubmitting }: PromptProps): JSX.Element => {

    return (
        <Prompt when={isDirty && !isSubmitting} message="You have unsaved changes, are you sure you want to leave?" />
    )
}