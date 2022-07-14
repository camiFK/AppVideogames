<p align='center'>
  <img width='550' src='https://mobimg.b-cdn.net/v2/fetch/a0/a0e8130daf0b55b2e6464fe4db345860.jpeg'/>
</p>

# Videogames App

Viodeogames App is a Single page application designed and developed as a personal project.

## Technologies

- [ ] React
- [ ] Redux
- [ ] Css Modules - Styled Components (no frameworks)
- [ ] NodeJs - Express
- [ ] Sequelize - PostgreSQL
- [ ] API - [rawg](https://rawg.io/)

### Database

#### Models
##### Videogame:
- UUID (to avoid problems with api ids)
- Name
- Description
- Release date
- Rating
- Image
##### Genres:
- Id
- Name
##### Platforms:
- Id
- Name

Intermediates tables to relate all entities.

## Backend
<p>
Node/Express server.
Filtering, ordering, and paging provided by the external API haven't been used. All these features have been implemented by me.
<p>
  
### Routes
  
 - [ ] __GET /videogames__:
   - Gets a list of 100 Videogames from api.rawg.
   - Returns necessary data for the main route.
 - [ ] __GET /videogames?name="..."__:
   - Gets the videogame whose name matches the query parameter (may be from the API or Database).
   - If there is no matching, a message is shown.
 - [ ] __GET /videogame/{id}__:
   - Gets the detail from the videogame selected according to the id (may be from the API or Database).
   - Returns necessary data for the detailed route.
 - [ ] __GET /genres__:
   - Gets all Videogames genres.
   - First, a call to the api.rawg is made to save the results in the database. Then, data is used directly from the database.
 - [ ] __GET /platforms__:
   - Gets all Videogames platforms.
   - First, a call to the api.rawg is made to save the results in the database. Then, data is used directly from the database.
 - [ ] __POST /videogame__:
   - Receives from body the data collected from the controlled form.
   - Creates a new Videogame in the database.
   
## Frontend
<p>
React/Redux application.
<p>

### Routes
  
 __Landing Page__:
- [ ] Representative image for the project.
- [ ] Home button.
  
__Main Route__:
- [ ] Search bar for searching Videogames.
- [ ] Videogame cards. Information shown:
  - Image
  - Name
  - Genres
- [ ] Sort by Genres.
- [ ] Sort by Platforms.
- [ ] Pagination to show and list all Videogames (12 per page).
  
__Detail Route__:
- [ ] Fields shown in the main route (image, name, and genres).
- [ ] Release date.
- [ ] Rating.
- [ ] Platforms.

__Creation Route__: 
- [ ] JavaScript controlled form to fill in with the information in the detail route.
- [ ] Add multiple genres.
- [ ] Add multiple platforms.

