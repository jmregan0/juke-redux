import React from 'react';

const Lyrics = ({ 
    text, setArtist, artistQuery, setSong, songQuery, handleSubmit 
}) => {
    
    const artistChange = (e) => setArtist(e.target.value);
    const songChange = (e) => setSong(e.target.value);
    
    return (
        <div id="lyrics">
        <form className="form-horizontal" onSubmit={handleSubmit}><fieldset>
            <legend>Lyrics</legend>
        
            <div className="form-group">
                <label className="col-xs-2 control-label">Artist</label>
                <div className="col-xs-10">
                    <input
                        className="form-control"
                        type="text"
                        onChange={artistChange}
                        value={artistQuery}
                    />
                </div>
            </div>
        
            <div className="form-group">
                <label className="col-xs-2 control-label">Song</label>
                <div className="col-xs-10">
                    <input 
                        className="form-control"
                        type="text"
                        onChange={songChange}
                        value={songQuery}
                    />
                </div>
            </div>
            
            <button
                type="submit"
                className="btn btn-success"
            >Submit</button>
        </fieldset></form>
                        

        <pre>{text || 'Search above!'}</pre>
        </div>
    );
};



export default Lyrics;