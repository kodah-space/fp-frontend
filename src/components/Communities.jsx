// import React, { useState, useEffect } from "react";
// import CommunityCard from "./CommunityCard";
// import CommunityServices from "../context/CommunityServices";

// export default function Communities() {
//   const [communitiesCreatedByUser, setCommunitiesCreatedByUser] =
//     useState(null);
//   const [communitiesUserIsMemberOf, setCommunitiesUserIsMemberOf] =
//     useState(null);

//   useEffect(() => {
//     // Fetch communities created by the user
//     CommunityServices.getCommunitiesCreatedByUser()
//       .then((resp) => {
//         setCommunitiesCreatedByUser(resp.data);
//       })
//       .catch((error) =>
//         console.error("Failed to fetch created communities:", error)
//       );

//     // Fetch communities the user is a member of
//     CommunityServices.getCommunitiesUserIsMemberOf()
//       .then((resp) => {
//         setCommunitiesUserIsMemberOf(resp.data);
//       })
//       .catch((error) =>
//         console.error("Failed to fetch member communities:", error)
//       );
//   }, []);

//   console.log("Communities Created By User:", communitiesCreatedByUser);
//   console.log("Communities User Is Member Of:", communitiesUserIsMemberOf);

//   if (!communitiesCreatedByUser || !communitiesUserIsMemberOf)
//     return "loading...";

//   return (
//     <div>
//       <div>
//         <ul>
//           {communitiesCreatedByUser.map((community) => (
//             <CommunityCard key={community.id} community={community} />
//           ))}
//           {communitiesUserIsMemberOf.map((community) => (
//             <CommunityCard key={community.id} community={community} />
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
