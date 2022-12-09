import {useState} from "react";

const ManageDisplayModal = () => {
    const [isShowing, setIsShowing] = useState(false);

    function toggle() {
        setIsShowing(!isShowing);
    }

    return {
        isShowing,
        toggle
    }
}

export default ManageDisplayModal;