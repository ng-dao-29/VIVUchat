import Avatar from "@mui/material/Avatar";
import {Button} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import {useSelector} from "react-redux";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

const img = [
    "https://chat.zalo.me/assets/inapp-welcome-screen-02.7f8cab265c34128a01a19f3bcd5f327a.jpg",
    "https://static.vecteezy.com/system/resources/previews/000/963/033/original/cartoon-business-man-sending-messages-vector.jpg",
    "https://img.freepik.com/premium-vector/flat-illustration-design-work-from-home_594699-16.jpg",
    "https://media.istockphoto.com/id/1210244210/vector/business-team-sending-message-to-global-group-people-and-business-email-marketing-content.jpg?s=612x612&w=0&k=20&c=BkyoOvn9WQevuBFlB5z5LT9xVA1_UuJJYpPX1m9DDSo=",
    "https://previews.123rf.com/images/alisarut/alisarut1812/alisarut181200008/127281928-recruiting-recruitment-recruitment-office-team-browsing-profiles-hr-concept-vector-illustration.jpg"
]

export default function ChatStart() {
    const {userData} = useSelector((state) => state.auth.user);

    return (
        <>
            <div className="flex flex-col items-center mb-10" style={{color: "white"}}>
                <Avatar
                    alt="Remy Sharp"
                    src={userData?.avatar}
                    sx={{width: 150, height: 150}}
                />
                <p className="text-2xl mb-4">Chào mừng bạn đến với ViVuChat</p>
                <p>Khám phá những tiện ích hỗ trợ làm việc và trò</p>
                <p>chuyện cùng người thân, bạn bè</p>
            </div>
            <Carousel breakPoints={breakPoints}>
                {img.map((url, index) => (
                        <img
                            key={index}
                            className=' h-80 ml-52'
                            style={{width: 550}}
                            src={url}
                            srcSet={url}
                            // alt={item.title}
                            loading="lazy"
                        />
                ))}
            </Carousel>
        </>
    )
}