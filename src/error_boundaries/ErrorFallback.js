import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback=({error, resetErrorBoundary})=>{
    return (
        <div role="alert">
            <p>Something went wrong</p>
            <pre></pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}

export default ErrorFallback;