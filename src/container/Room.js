import React from 'react';
import { Link } from 'react-router-dom';
import "./room.css"

function Room() {
    return (
        <div className='room'>
            <div className="room-item1">
                <div className="room-item-list">
                    <div className="room-item-price">
                        <p>Giá Từ 1.800.000 </p>
                    </div>
                    <h2>ROLEX</h2>
                    <p>Quý ông lịch lãm với các mẫu đồng hồ ROLEX</p>
                    <Link to="/rolex"><button>MUA NGAY</button></Link>
                </div>
            </div>
            <div className="room-item2">
                <div className="room-item-list">
                    <div className="room-item-price">
                        <p>Giá Từ 1.800.000 </p>
                    </div>
                    <h2>HUBLOT</h2>
                    <p>Quý ông lịch lãm với các mẫu đồng hồ HUBLOT</p>
                    <Link to="/hublot"><button>MUA NGAY</button></Link>
                </div>
            </div>
        </div>
    );
}

export default Room;