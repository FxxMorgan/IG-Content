<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap" rel="stylesheet">
</head>
<body>
    <div class="main">  
        <input type="checkbox" id="chk" aria-hidden="true">

        <div class="signup">
            <form action="register.php" method="POST">
                <label for="chk" aria-hidden="true">Registro</label>
                <input type="text" name="username" placeholder="Nombre" required="">
                <input type="email" name="email" placeholder="Email" required="">
                <input type="password" name="password" placeholder="Contraseña" required="">
                <button type="submit">Registrar</button>
            </form>
        </div>

        <div class="login">
            <form action="login.php" method="POST">
                <label for="chk" aria-hidden="true">Login</label>
                <input type="email" name="email" placeholder="Email" required="">
                <input type="password" name="password" placeholder="Contraseña" required="">
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
</body>
</html>
