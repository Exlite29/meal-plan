import { ClipLoader } from 'react-spinners'

function Loader() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <ClipLoader />
        </div>
    );
}

export default Loader