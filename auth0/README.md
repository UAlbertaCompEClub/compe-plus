# How to set-up a new environment

1. Create a new tenant
    > Make sure to use an obscure name because tenant names cannot be reused once deleted
2. Create `Deploy CLI Application` (Machine to Machine) and authorize it with all permissions from `Auth0 Management API`
3. Fill in [`config.json`](./config.json) with the relevant details
4. Run the following bash command to import the tenant configuration from `tenant.yaml`

    ```bash
    npx a0deploy import --debug --config_file config.json --format yaml --input_file tenant.yaml
    ```

# How to change Auth0 configuration

1. Set-up a dummy tenant (follow all the steps above)
2. Make your changes to the tenant
3. Import the tenant configuration with the following command

    ```bash
    npx a0deploy export --debug --config_file config.json --format yaml --output_folder .
    ```
