export interface IContextProps {
    state: any
    dispatch: ({ type, payload }: { type: string, payload?: any }) => void
}