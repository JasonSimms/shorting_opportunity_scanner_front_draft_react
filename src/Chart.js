const Chart = ({activeTicker}) => {
        if(!activeTicker){
            return(<h3>Select a security of interest in the table above to see more analysis</h3>)
        } else {
            console.log(activeTicker)
            return(<div>
                <h1>Debug Chart.js: {typeof(activeTicker)} {activeTicker} </h1>
                </div>)
            }
}

export default Chart