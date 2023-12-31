# NextPHP

NextPHP is a web framework for people who love PHP so much that they want to write it in JavaScript.

## Features

- PHP-like development experience, but in JavaScript
- Full support for SSR
- Filesystem-based routing
- Can run on Deno Deploy

## How does PHP written in JavaScript look like?

### Form Submission

```ejs
<body>
    <% if (req.method === 'POST') { %>
    <h2>
        <%- await include('../partials/greeting', { name: (await req.formData()).get('name') }) %>
    </h2>
    <% } else { %>
    <form method="POST">
        <input type="text" name="name" />
        <button type="submit">Greet</button>
    </form>
    <% } %>
</body>
```

### JSON Response

```ejs
<% 
res.headers.set('Content-Type', 'application/json') 
echo(JSON.stringify(Object.fromEntries(req.headers)))
%>
```

## Usage

Check the `example` folder for a simple example. Basically, all you need to do is `Deno.serve(createHandler(...))`, where `createHandler` can be imported from <https://deno.land/x/next_php/mod.ts>.
