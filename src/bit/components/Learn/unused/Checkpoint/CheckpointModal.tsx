import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

import Upload from './Upload';
import Result from './Result';

const CheckpointModal = (props) => {
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState({});
    const [currentSlide, setSlide] = useState('upload');

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const switchToResult = () => {
        setSlide('checkpoint');
    }

    const switchToUpload = () => {
        setSlide('upload');
    }

    const fillResult = (result) => {
        setResult(result);
    }

    return (
        <div>
            <button onClick={openModal}>Checkpoint</button>

            <Modal
                open={open}
                onClose={closeModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>

                <Fade in={open}>
                    {currentSlide === 'upload' ?
                        <Upload closeModal={closeModal} fillResult={fillResult} switchToResult={switchToResult} />
                        : <Result closeModal={closeModal} result={result} switchToUpload={switchToUpload} />
                    }
                </Fade>
            </Modal>
        </div>
    );
}

export default CheckpointModal;
