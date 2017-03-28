### Sassflow 

This is a gulpfile configuration to process `.scss` files throught multiple steps.

## Tasks availables

* sassflow:dev
    * scss to css
    * sourcemaps
    * autoprefixer
    
* sassflow:watch
    It runs sassflow:dev in watch mode
    
* sassflow:prod
    * scss to css
    * autoprefixer
    * css declarations sorted with csscomb
    * minification with csswring
    
* sassflow:lint
    * lint .scss files with `stylelint` plugin
    
* sassflow:doc
    * sassdoc documentation
    

## Notes
This gulpfile assume your are working in a babel environnement.

The stylelint config is given by the `.stylelintrc` file.
