import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponents";
import { useStore } from "../../app/stores/store";
import ProfileConten from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

export default observer(function ProfilePage(){
    const {username} = useParams<{username: string}>();
    const {profileStore} = useStore();
    const {loadingProfile, loadProfile, profile} = profileStore;

    useEffect(() => {
        loadProfile(username);
    }, [loadProfile, username])

    if(loadingProfile) return <LoadingComponent content='Loading profile...' />

    return(
        <Grid>
            <Grid.Column width={16}>
                {profile &&
                <>
                    <ProfileHeader profile={profile}/>
                    <ProfileConten profile={profile}/>
                </>} 
            </Grid.Column>
        </Grid>
    )
})