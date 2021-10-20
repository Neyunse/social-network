#### KagariNetwork

Feel free to send a PR to change/add or correct my project.
## Install

`./ yarn install`

`./backend/ yarn install`

`./frontend/ yarn install`

## Backend Settings

For Strapi and the frontend to work smoothly it is necessary to make some adjustments to the roles.

The frontend uses the user's token to create new posts or reply, so it is necessary to enable the necessary permissions for authenticated users.
Link to the role settings page:
http://localhost:1337/admin/settings/users-permissions/roles/1


And these are the settings

![](images/01_2.png)

![](images/02.png)


Then click the save button and confirm the changes... then create a user and that's it, you can login from the frontend...

#### New settings

It is now necessary to activate in the public role the access to `find` avatars.
http://localhost:1337/admin/settings/users-permissions/roles/2

You also need to set up strapi with Auth0.

You also need to configure strapi with Auth0, but you don't need to make changes to the frontend to integrate it, as I have configured most of the integration.

[How implement Auth0 in the backend](https://strapi.io/blog/auth0-provider-and-strapi-tutorial)

The avatar and banner are no longer mandatory, as the api now gets the avatar from gravatar or any social network that the username is the same as the one entered to create an account.


## START

`./backend/ yarn develop`

`./frontend/ yarn start`

or 

`./ yarn start`