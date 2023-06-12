import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useUser from "./useUser";

const useLoginUser = () => {
  const [loginUser, setLoginUser] = useState({});

  const { user, loading } = useAuth();
  const { users: allUser } = useUser();
  useEffect(() => {
    const loggedInUser = allUser.find(
      (currentUser) => currentUser.email === user?.email
    );
    setLoginUser(loggedInUser);
  }, [user]);
  return { loginUser, loading };
};

export default useLoginUser;
