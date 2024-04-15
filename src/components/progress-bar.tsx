export const ProgressBar = (props: {num: number, den: number}) => {
    const width = props.num/props.den * 100;

    return (
        <>
            <div className="progress-bar">
                <div className="progress-fill" style={{width: `${ width }%`}}></div>
            </div>
        </>
    )
}