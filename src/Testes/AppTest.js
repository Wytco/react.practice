import React from 'react'
import Character from './Character'

const AppTest = ({side}) => {
    if (!side) {
        side = 'light'
    }

    const characters = [
        {name: 'Люк Скайвокер', side: 'light'},
        {name: 'Йода', side: 'light'},
        {name: 'Обиван Кеноби', side: 'light'},
        {name: 'Палпатин', side: 'dark'},
        {name: 'Дарт Вэйдер', side: 'dark'}
    ];

    const filteredChars = characters.filter(char => char.side === side);

    return (
        <div style={{justifyContent: 'center',display: 'flex',textAlign:'center'}}>
            <ul>
                {filteredChars.map((char, index) => (
                    <Character key={char.name + index} name={char.name} side={char.side} />
                ))}
            </ul>
        </div>
    )
};

export default AppTest;