type SessionUser = {
     name?: string | null;
     email: string;
     image?: string | null;
};

export async function fetchUserProfileSelfHealing(user: SessionUser) {
     const base = process.env.NEXT_PUBLIC_URL;
     const email = encodeURIComponent(user.email);

     const getInfo = () =>
          fetch(`${base}/api/users/dashboard/info?email=${email}`);

     let res = await getInfo();
     if (res.status === 404) {
          const fallbackImage =
               user.image ||
               `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                    user.name || user.email
               )}`;

          const createRes = await fetch(`${base}/api/users`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                    name: user.name || user.email.split("@")[0],
                    email: user.email,
                    image: fallbackImage,
               }),
          });

          if (createRes.ok) {
               res = await getInfo();
          }
     }

     if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
     }

     return res.json();
}