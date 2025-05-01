const fetchUserProfile = async () => {
  if (!localStorage.getItem("authToken")) {
    console.error("No auth token found");
    navigate("/login");
    return;
  }

  try {
    const userData = await httpGet(URLS.user(userId), {
      headers: getAuthHeader(),
    });

    setProfile({
      username: userData.username || "",
      email: userData.email || "",
      phone: userData.phone || "",
      website: userData.website || "",
      jobDescription: userData.jobDescription || "",
      address: userData.address || "",
      country: userData.country || "",
      state: userData.state || "",
      city: userData.city || "",
      zipCode: userData.zipCode || "",
      google: userData.google || "",
      facebook: userData.facebook || "",
      twitter: userData.twitter || "",
      linkedin: userData.linkedin || "",
      verificationEmail: userData.verificationEmail || "",
      imageUrl: userData.imageUrl || "",
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    });
    setSidebarProfile({
      username: userData.username || "",
      imageUrl: userData.imageUrl || "",
    });
    setLoading(false);
  } catch (error) {
    console.error("Error fetching profile:", error);
    if (error.response?.status === 401) {
      navigate("/login");
    }
    setLoading(false);
  }
};
