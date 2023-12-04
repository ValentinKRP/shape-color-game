import React from 'react'

interface PlayerData {
    name: string;
    score: number;
}

interface LeaderboardProps {
    playersData: PlayerData[];
}

const LeaderboardComponent: React.FC<LeaderboardProps> = ({ playersData }) => {
    return (
        <div className="players-ranking">
            <h2>Players Ranking</h2>
            <ul>
                {playersData.map((player, index) => (
                    <li key={index}>
                        {index + 1}. {player.name} - {player.score} seconds
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaderboardComponent;