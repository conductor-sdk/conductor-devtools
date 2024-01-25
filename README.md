# Conductor DevTools

## Installation

```bash
npm install cdt -g
```

or clone the repository. Build and install as follow:

```bash
nmp install
npm run build
npm install -g .
```

## Usage

```bash
cdt --type worker --lang javascript --name mydemo --task mytask
```
This command will generate files located in the conductor-sdk/boilerplates repository, attributes lang and type will pick the corresponding boilerplate (Ex: /javascript/worker/core).

You can access a specific boilerplate using the --boilerplate argument.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)


