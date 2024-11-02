import videoHomePage from '../../assets/video-homepage.mp4'



const HomePage = (props) => {
    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source
                    src={videoHomePage}
                    type='video/mp4'>
                </source>
            </video>
            <div className='homepage-content' >
                <div className='text-homepage-one'>
                    There's a better way to ask
                </div>
                <div className='text-homepage-two'>
                    You don't want to make a boring form. And you audience won't answer one. Create typeform instead and make everyone happy
                </div>
                <div className='button-homepage'>
                    <button>
                        Get's Start
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomePage;