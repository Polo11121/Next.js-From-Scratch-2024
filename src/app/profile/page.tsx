import { getSessionUser } from "@/utils/getSessionUser";
import { getProperties } from "@/services/getProperties";
import { ProfileProperties } from "@/components/profile-properties/profile-propeties";
import profileDefault from "@/assets/profile.png";
import Image from "next/image";

const ProfilePage = async () => {
  const sessionUser = await getSessionUser();
  const properties = await getProperties({
    owner: sessionUser?.id,
  });

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  width={200}
                  height={200}
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={sessionUser?.image || profileDefault}
                  alt="Profile picture"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>
                {sessionUser?.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span>
                {sessionUser?.email}
              </h2>
            </div>
            <ProfileProperties properties={properties} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
