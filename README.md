## Deploying to Heroku using Github Actions

1. **Create repository:**

1.1.  Create a `.gitignore` for Node.js.

---

2. **Created Node.js application.** For my example, I created a simple _"Hello World"_ Express web server.

2.1. `package.json` contains dependencies for Express, Morgan and Nodemon.

2.2. Push your code to Github.

---

3. Create Actions: **Node.js**> **"Set up this worflow"**.

3.1. Click **"Start Commit"**>**"Commit new file"**.

3.2. Now Node CI worflow should be triggered. It test is successful, you should see a green check.

---

4. **Setup Heroku:**

4.1. Go to heroku.com and create a new application: **New > Create New App**.

4.2. Get your **Heroku API key**. Located at **"Account Settings"**.

4.3. Copy the **API key** from Heroku to your github repository secrets: **Settings > Secrets > Add a new secret**.

4.4. Paste the **API Key** on the Value field, and give it a name, e.g. `HEROKU_API_KEY`.

4.5. In order to run on the Heroku **container**, you need to create a `Dockerfile`  and `.dockerignore`. Read [here](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/
) for more details.

4.6. Update your Dockerfile CMD to: `["node", "<YOUR_SERVER_SCRIPT.JS>*" ]` and set `EXPOSE` to the port the server should run.

   **Example:**
```
    CMD [ "node", "server.js" ]
    EXPOSE 8080
```


   4.7. Push the changes to your repository.

---

5.  **Create Heroku github workflow:**

5.1. Create new workflow: **Actions > New workflow > Set up a workflow yourself**.

5.2. Rename it to "`heroku.yml`".

5.3.  Paste the following code on the edit window:

 ```on: push
name: Deploy to Heroku
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - name: login
      uses: actions/heroku@master
      env:
        HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
      with:
        args: container:login
    - name: push
      uses: actions/heroku@master
      env:
        HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
      with:
        args: container:push -a <YOUR_HEROKU_APP_NAME> web
    - name: release
      uses: actions/heroku@master
      env:
        HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
      with:
        args: container:release -a <YOUR_HEROKU_APP_NAME> web
```


5.4. Update **<YOUR_HEROKU_APP_NAME>** to reflect the application name you created on Heroku.com _(4.1)_.

5.5. **HEROKU_API_KEY** refers to the secret key we created earlier on the github repository settings _(4.4)_.

5.6. Commit changes: **"Start Commit"**>**"Commit new file"**.

### Now your workflow should be triggered. If the job is executed successfully, your code will be deployed to Heroku!
### Check `<YOUR_HEROKU_APP_NAME>`.herokuapp.com and see the **results**!

#### Read more about Github Actions [here](https://help.github.com/en/actions).