
Soccer Platform 

- Database
    Teams

        IdTeams
        Name
        Prefix



    Players_{Prefix}

        IdPlayers
        cd_Teams
        Name
        Number
        YearOfBirth
        Position1
        Position2



    Games_{Prefix}

        IdGames
        Competitor
        Date
        Hour
        HomeAway
        Type (Friendly, Championship, Cup)
        ResultFirstHalf
        ResultSecondHalf
        GoalsScored
        GolsReceived




GamesPlayersStats_{Prefix}
    cd_Teams
    cd_Players
    cd_Games
    GoalsScored
    GoalsReceived (GK)
    MinutesPlayed
    RedCards
    YellowCards


---------------------------
UI
API
DB
Tables 