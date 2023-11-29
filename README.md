# NextPHP

NextPHP is a web framework for people who love PHP so much that they want to write it in JavaScript.

## Preview

```html
<body>
    <% if (req.method === 'POST') { %>
    <h2>
        <%- await include('../partials/greeting', { name: (await req.formData()).get('name') }) %>
    </h2>
    <% } else { %>
    <form method="POST">
        <input type="text" name="name" />
        <button type="submit">Submit</button>
    </form>
    <% } %>
</body>
```

## Usage

Check the `example` folder for a simple example. Basically, all you need to do is `Deno.serve(createHandler(...))`, where `createHandler` can be imported from <https://deno.land/x/next_php/mod.ts>.
