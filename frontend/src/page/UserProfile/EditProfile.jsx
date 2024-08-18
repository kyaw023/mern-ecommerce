import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { AuthContext } from "../../context/AuthContext";
import { Pen } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditeCreateProfilePage = () => {
  const { state, updateUser } = useContext(AuthContext);
  const { user, loading } = state;
  const [previewImg, setPreviewImg] = useState(null);
  const [file, setFile] = useState(null);
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const nav = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    setEditUser((prev) => ({
      ...prev,
      name: user?.name,
      email: user?.email,
      bio: user?.bio,
    }));
    setPreviewImg(import.meta.env.VITE_BACKEND_ASSET_URL + user?.image);
  }, [user]);

  const onChangeHandler = (e) => {
    setEditUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const values = {
        name: editUser.name,
        email: editUser.email,
        bio: editUser.bio,
      };

      const res = await axios.patch(`/api/users/${id}/edit`, values, {
        withCredentials: true,
      });

      let imageUpate;

      const formData = new FormData();
      if (file) {
        formData.set("photo", file);

        imageUpate = await axios.post(
          `/api/users/${res.data?._id}/upload`,
          formData,
          {
            headers: {
              Accept: "multipart/form-data",
            },
            withCredentials: true,
          }
        );
      }
      if (res.status === 200) {
        updateUser({
          ...res.data,
          image: imageUpate?.data.image
            ? imageUpate?.data.image
            : res.data.image,
        });

        nav(`/profile/${id}`);
        toast.success(`Your Profile have been updated Successfully`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    setFile(file);

    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      setPreviewImg(e.target.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div>
      <div className=" flex  gap-5 mb-4 border rounded-lg max-w-sm p-10">
        <div className=" mt-4">
          {previewImg && (
            <img
              className=" w-40 h-40  object-cover rounded-full"
              src={
                previewImg
                  ? previewImg
                  : "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"
              }
              alt=""
            />
          )}
        </div>
        <div className="relative">
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer">
            <Pen size={16} className="text-white" />
          </div>
        </div>
      </div>

      <form onSubmit={submitHandler} className=" max-w-sm space-y-4">
        <div>
          <Label className=" dark:text-slate-100">Name</Label>
          <Input
            className=" dark:text-slate-100"
            name="name"
            onChange={onChangeHandler}
            placeholder="Your Name"
            value={editUser.name}
          />
        </div>
        <div>
          <Label className=" dark:text-slate-100">Email</Label>
          <Input
            className=" dark:text-slate-100"
            name="email"
            onChange={onChangeHandler}
            placeholder="Your Email"
            value={editUser.email}
          />
        </div>
        <div>
          <Label className=" dark:text-slate-100">Bio</Label>
          <Textarea
            name="bio"
            onChange={onChangeHandler}
            value={editUser?.bio}
            placeholder="Tell us a little bit about yourself"
            className="resize-none dark:text-slate-100"
          />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default EditeCreateProfilePage;
