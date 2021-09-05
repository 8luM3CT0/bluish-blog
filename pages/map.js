//front-end
import Head from 'next/head'
import MapBanner from '../components/map/map-banner/MapBanner'
import MapHeader from '../components/map/map-header/MapHeader'
import SmallCard from '../components/map/map-feed/SmallCard'
import MediumCard from '../components/map/map-feed/MediumCard'
import LargeCard from '../components/map/map-feed/LargeCard'
//back-end

function Map ({ cardsData }) {
  return (
    <div
      className='
        overflow-y-scroll 
        scrollbar-hide
        bg-gray-900
        '
    >
      <Head>
        <title>Places-to-stay</title>
      </Head>
      <MapHeader />
      <MapBanner />
      <main
        className='
      mx-auto
      max-w-7xl
      px-8
      sm:px-16
      overflow-y-scroll
      scrollbar-hide
      '
      >
        {/**the location cards */}
        <section className='pt-6'>
          <h2
            className='
          pb-5
          mapH2
          '
          >
            Explore some choices
          </h2>
          <div
            className='
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          '
          >
            <SmallCard
              img='https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/1/hollywood-sign-california-carlin-blahnik.jpg'
              location='Los Angeles'
              distance='27.6 miles'
            />
            <SmallCard
              img='https://render.fineartamerica.com/images/images-profile-flow/400/images-medium-large-5/1-golden-gate-bridge-san-francisco-irina-sztukowski.jpg'
              location='San Francisco'
              distance='374.3 miles'
            />
            <SmallCard
              img='https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/1/hoover-tower-from-hills-gary-coleman.jpg'
              location='Palo Alto'
              distance='367.9'
            />
            <SmallCard
              img='https://render.fineartamerica.com/images/images-profile-flow/400/images-medium-large-5/mission-beach-san-diego-mary-helmreich.jpg'
              location='San Diego'
              distance='150.6 miles'
            />
            <SmallCard
              img='https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/1/sacramento-california-bri-b.jpg'
              location='Sacramento'
              distance='376.7'
            />
            <SmallCard
              img='https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/1/lake-tahoe-albert-bierstadt-.jpg'
              location='Lake Tahoe'
              distance='434.3 miles'
            />
            <SmallCard
              img='https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/1/that-glorious-light-michael-humphries.jpg'
              location='Mammoth Lakes'
              distance='301.2 miles'
            />
            <SmallCard
              img='https://render.fineartamerica.com/images/images-profile-flow/400/images-medium-large-5/las-vegas-skyline-bri-buckley-.jpg'
              location='Las Vegas'
              distance='290.7 miles'
            />
          </div>
        </section>
        {/**Middle stuff */}
        <section>
          <h2
            className='
          mapH2
            py-8
          '
          >
            Live Anywhere
          </h2>
          <div
            className='
          flex
          items-center
          overflow-x-scroll
          scrollbar-hide
          space-x-3
          '
          >
            {cardsData?.map(({ img, title }) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </div>
        </section>
        <LargeCard
          img='https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/1/a-pawnee-indian-shooting-alfred-jacob.jpg'
          title='The Best Places'
          description='Wishlists inspired by AirBnB'
          buttonText='Get Inspired'
        />
      </main>
    </div>
  )
}

export default Map

export async function getStaticProps (context) {
  const cardsData = await fetch('https://links.papareact.com/zp1').then(res =>
    res.json()
  )

  return {
    props: {
      cardsData
    }
  }
}
