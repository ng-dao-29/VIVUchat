import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

const img = [
    "https://chat.zalo.me/assets/inapp-welcome-screen-02.7f8cab265c34128a01a19f3bcd5f327a.jpg",
    "https://chat.zalo.me/assets/quick-message-onboard.3950179c175f636e91e3169b65d1b3e2.png",
]

export default function ChatStart() {
    const { userData } = useSelector((state) => state.auth.user);

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <div className="flex flex-col items-center mb-10 text-white w-full">
                <p className="text-2xl mb-4">Chào mừng bạn đến với ViVuChat</p>
                <p>Khám phá những tiện ích hỗ trợ làm việc và trò</p>
                <p>chuyện cùng người thân, bạn bè</p>
            </div>
            <div className="w-full">
                <Carousel breakPoints={breakPoints}>
                    {img.map((url, index) => (
                        <div className="flex justify-center">
                            <img
                                key={index}
                                className='h-79'
                                style={{ width: 550 }}
                                src={url}
                                srcSet={url}
                                loading="lazy"
                            />
                        </div>

                    ))}
                </Carousel>
            </div>

        </div>
    )
}