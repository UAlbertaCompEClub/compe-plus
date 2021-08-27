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

1.  Set-up a dummy tenant (follow all the steps above)
2.  Make your changes to the tenant
3.  Export the tenant configuration with the following command

    ```bash
    npx a0deploy export --debug --config_file config.json --format yaml --output_folder .
    ```

4.  Publish the changes to the main tenants by either:

    1.  Modifying the `config.json` file for each environment, or
    2.  Create 3 different config files, fill them in with their corresponding field values,
        (e.g.)

        ```bash
        npx a0deploy import --debug --config_file dev-config.json --format yaml --input_file tenant.yaml
        npx a0deploy import --debug --config_file staging-config.json --format yaml --input_file tenant.yaml
        npx a0deploy import --debug --config_file prod-config.json --format yaml --input_file tenant.yaml

        ```
