import React from 'react'

const Spinner = () => {
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                <div className="spinner-border text-danger mt-5 mb-5" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <>Loading...</>
            </div>
        </div>
    )
}

export default Spinner
