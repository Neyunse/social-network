#### KagariNetwork

Feel free to send a PR to change/add or correct my project.

(This app don't has responsive design, maybe in the future I will add it.)

## Install

`./backend/ yarn install`

`./frontend/ yarn install`

## Backend Settings

For Strapi and the frontend to work smoothly it is necessary to make some adjustments to the roles.

The frontend uses the user's token to create new posts or reply, so it is necessary to enable the necessary permissions for authenticated users.
Link to the role settings page:
http://localhost:1337/admin/settings/users-permissions/roles/2


And these are the settings

![](images/01_2.png)

![](images/02.png)


Then click on the save button and confirm the changes... then create a user in the users section and that's it, you can log in from the frontend...

http://localhost:1337/admin/plugins/content-manager/collectionType/plugins::users-permissions.user?page=1&pageSize=10&_sort=username:ASC 

## Extra

configure your imagekit credentials in the `env` file located in `./backend`

## START

`./backend/ yarn develop`

`./frontend/ yarn start`
