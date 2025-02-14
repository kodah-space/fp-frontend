import React from "react";
import { useEffect, useState } from "react";
import userServices from "../context/UserServices";
import { useColorScheme } from "../context/ColorSchemeServices";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

export default function CommunityCard({ community }) {
  const { currentScheme } = useColorScheme();
  const { user, storeToken, authenticateUser, isLoggedIn } =
    useContext(AuthContext);
  const [isCreator, setIsCreator] = useState(undefined);

  useEffect(() => {
    if (user._id === community.creator._id) {
      setIsCreator(true);
      console.log("creator");
    } else {
      setIsCreator(false);
      console.log("not creator");
    }
  }, [user._id]);

  return (
    <div className="p-2">
      <Link to={`/communities/${community._id}`}>
        <div
          className="relative border-2 border-solid w-36 h-36 rounded-full overflow-hidden flex items-center justify-center"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div className="absolute inset-0 top-0 w-full h-1/2 z-10">
            <img
              src={community.communityImage}
              className="absolute inset-0 w-full h-full object-cover rounded-t-full"
            />
          </div>
          <div
            className="absolute inset-x-0 top-1/2 w-full h-0 border-b-2 z-15"
            style={{ borderColor: "var(--border-color)" }}
          ></div>
          <div className="absolute bottom-3 w-full h-1/2 flex items-center justify-center z-20">
            {isCreator && (
              <div className="px-1 text-sm text-center font-[Unbounded-Regular] tracking-wide overflow-hidden line-clamp-2 ">
                {community.name}
                <div>(owner)</div>
              </div>
            )}
            {!isCreator && (
              <div className="px-1 text-sm text-center font-[Unbounded-Regular] tracking-wide overflow-hidden line-clamp-2 ">
                {community.name}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
