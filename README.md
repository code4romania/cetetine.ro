# Ce te tine treaz noaptea? (What Keeps You Up at Night?)

[![Build Status](https://img.shields.io/travis/com/code4romania/cetetine.ro/master.svg?style=for-the-badge)](https://travis-ci.com/code4romania/cetetine.ro) [![GitHub contributors](https://img.shields.io/github/contributors/code4romania/cetetine.ro.svg?style=for-the-badge)](https://github.com/code4romania/cetetine.ro/graphs/contributors) [![GitHub last commit](https://img.shields.io/github/last-commit/code4romania/cetetine.ro.svg?style=for-the-badge)](https://github.com/code4romania/cetetine.ro/commits/master) [![License: MPL 2.0](https://img.shields.io/badge/license-MPL%202.0-brightgreen.svg?style=for-the-badge)](https://opensource.org/licenses/MPL-2.0)

* Identifying blockages
* Gathering leads

[See the project live](https://cetetine.ro/)

An easy to use website enabling users (professional groups, NGOs or private individuals) to signal us various social blockages that they are facing.

[Built with](#built-with) | [Deployment](#deployment) | [Contributing](#contributing) | [Feedback](#feedback) | [License](#license) | [About Code4Ro](#about-code4ro)

## Built with

[Hugo](https://gohugo.io/), [Bulma](https://bulma.io/), [gulp.js](https://gulpjs.com/) and everything else listed in [package.json](package.json).

## Deployment
The static website is currently deployed on an Amazon S3-backed CloudFront distribution. All the submission processing happens on AWS Lambda and emails are sent through Amazon SES. The actual deployment steps are detailed in the [`.travis.yml`](.travis.yml) file.

If deploying separately, you will need to `npm install aws-sdk` for the handler function to… _function_.

### Configuration

Edit the main copy in [`content/_index.md`](content/_index.md), the form in [`function/form.json`](function/form.json) and other params in [`config.yml`](config.yml).

The handler expects the following environment variables:

* `CORS_DOMAIN` – Domain to allow requests from.
* `EMAIL_FROM` – Email address that sends the form.
* `EMAIL_TO` – One or more comma-separated email addresses that will receive the form data.

### Building

```
$ npm install
$ npm run build
$ hugo
```

## Contributing

If you would like to contribute to one of our repositories, first identify the scale of what you would like to contribute. If it is small (grammar/spelling or a bug fix) feel free to start working on a fix. If you are submitting a feature or substantial code contribution, please discuss it with the team and ensure it follows the product roadmap.

* Fork it (https://github.com/code4romania/cetetine.ro/fork)
* Create your feature branch (git checkout -b feature/fooBar)
* Commit your changes (git commit -am 'Add some fooBar')
* Push to the branch (git push origin feature/fooBar)
* Create a new Pull Request

## Feedback

* Request a new feature on GitHub.
* Vote for popular feature requests.
* File a bug in GitHub Issues.
* Email us with other feedback contact@code4.ro

## License

This project is licensed under the MPL 2.0 License - see the [LICENSE](LICENSE) file for details

## About Code4Ro

Started in 2016, Code for Romania is a civic tech NGO, official member of the Code for All network. We have a community of over 500 volunteers (developers, ux/ui, communications, data scientists, graphic designers, devops, it security and more) who work pro-bono for developing digital solutions to solve social problems. #techforsocialgood. If you want to learn more details about our projects [visit our site](https://www.code4.ro/en/) or if you want to talk to one of our staff members, please e-mail us at contact@code4.ro.

Last, but not least, we rely on donations to ensure the infrastructure, logistics and management of our community that is widely spread accross 11 timezones, coding for social change to make Romania and the world a better place. If you want to support us, [you can do it here](https://code4.ro/en/donate/).
