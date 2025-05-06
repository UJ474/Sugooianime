import CurrentAnimeFeed from './Othercontents/currentanimefeed.jsx'
import SuggestedAnimeFeed from './Othercontents/suggestedanimefeed.jsx'
import TrendingAnime from './TrendingAnime/trendinganime.jsx'

export default function HomePagecontent() {
    return (
        <>
        <TrendingAnime />
        <CurrentAnimeFeed />
        <SuggestedAnimeFeed />
        </>
    )
}