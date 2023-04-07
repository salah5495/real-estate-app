// import GoogleMapReact from "google-maps-react";
// import { GOOGLE_MAPS_KEY } from "../../config";

// export default function MapCard({ ad }) {
//   const defaultProps = {
//     center: {
//       lat: ad?.location?.coordinates[1],
//       lng: ad?.location?.coordinates[0],
//     },
//     zoom: 11,
//   };

//   if (ad?.location?.coordinates?.length) {
//     return (
//       <div style={{ width: "100%", height: "350px" }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{
//             key: GOOGLE_MAPS_KEY,
//             language: "en",
//             region: "US",
//             libraries: ["places", "geometry"],
//             googleMapsApiKey: GOOGLE_MAPS_KEY,
//           }}
//           defaultCenter={defaultProps.center}
//           defaultZoom={defaultProps.zoom}
//           yesIWantToUseGoogleMapApiInternals // add this line
//         >
//           <div
//             lat={ad?.location.coordinates[1]}
//             lng={ad?.location.coordinates[0]}
//           >
//             <span className="lead">📍</span>
//           </div>
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }
