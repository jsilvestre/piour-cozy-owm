module.exports = class City extends Backbone.Model

    urlRoot: 'cities'

    initialize: ->
        @fmtCityWeatherInfos()
        @fmtCityForecastInfos()

    toRoundCelcius: (value) ->
        parseInt(value - 273.15)

    fmtCityWeatherInfos: () =>
        toSet = {}

        main = @get "main"
        if main
            toSet.temp     = @toRoundCelcius(main.temp)
            toSet.humidity = main.humidity

        weather = @get "weather"
        if weather
            toSet.weather = weather[0]

        clouds = @get "clouds"
        if clouds
            toSet.clouds = clouds.all

        sys = @get "sys"
        if sys
            toSet.country = sys.country

        name = @get "name"
        if name
            toSet.name = name

        @set toSet

    toReadableDate: (value) ->
        date = new Date 0
        date.setUTCSeconds value
        "" +
        date.getDate() + '/' +
        (date.getMonth()+ 1) + '/' +
        date.getFullYear()

    fmtCityForecastInfos: () =>
        next5    = []
        forecast = @get "list"
        if forecast
            for day in forecast
                nextDay = {}
                nextDay.date     = @toReadableDate(day.dt)
                nextDay.day      = @toRoundCelcius(day.temp.day)
                nextDay.night    = @toRoundCelcius(day.temp.night)
                nextDay.humidity = day.humidity
                nextDay.weather  = day.weather[0]

                next5.push nextDay
        @set "days", next5
