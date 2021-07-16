 <form @submit="createuser" method="post">
                UserName
                <br> <input type="text" id="u_name" v-model="u_name" placeholder="UserName"><br>
                Password
                <br><input type="password" id="u_password" v-model="u_password" placeholder="Password"><br><br> 
                <button type="submit" id="signup">Signup</button>
            </form>