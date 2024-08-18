import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { LoadingComponent } from "../../components";

import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const { state } = useContext(AuthContext);
  const [updateUser, setUpdateUser] = useState(null);

  useEffect(() => {
    setUpdateUser(state?.user);
  }, [state]);

  return (
    <LoadingComponent isLoading={state?.loading}>
      <div>
        <h1 className=" dark:text-slate-100 ">My Profile</h1>

        <div className=" mt-4">
          <div className=" flex items-center gap-5 border p-4 rounded-lg border-slate-300">
            <Avatar>
              <AvatarImage
                src={import.meta.env.VITE_BACKEND_ASSET_URL + updateUser?.image}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className=" font-semibold dark:text-slate-100">
                {updateUser?.name}
              </h1>
              <span className=" text-xs text-slate-400 dark:text-slate-300">
                Active Now
              </span>
            </div>
          </div>

          <div className=" mt-4  border p-4 rounded-lg border-slate-300">
            <h1 className=" text-lg font-semibold dark:text-slate-100">
              Personal Information
            </h1>

            <div className=" mt-4 max-w-sm space-y-4 border p-4 rounded-lg border-slate-300">
              <div className=" space-y-1">
                <Label className=" mb-4 dark:text-slate-100">Name</Label>
                <Input
                  className=" focus-visible:ring-0 dark:bg-slate-950 dark:text-slate-100"
                  value={updateUser?.name}
                  readOnly
                />
              </div>
              <div className=" space-y-1">
                <Label className=" mb-4 dark:text-slate-100">Email</Label>
                <Input
                  className=" focus-visible:ring-0 dark:bg-slate-950 dark:text-slate-100 focus-visible:ring-slate-50 focus-visible:ring-offset-0"
                  value={updateUser?.email}
                  readOnly
                />
              </div>
              <div className=" space-y-1">
                <Label className=" mb-4 dark:text-slate-100">Bio</Label>
                <Textarea
                  className=" resize-none focus-visible:ring-0 dark:bg-slate-950 dark:text-slate-100 focus-visible:ring-slate-50 focus-visible:ring-offset-0"
                  value={updateUser?.bio}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadingComponent>
  );
};

export default ProfilePage;
