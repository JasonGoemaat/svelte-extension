<article class="card">
    <h2><slot name="title">Title</slot></h2>
    <slot></slot>
</article>

<style type="text/scss">
    article.card {
        font-size: 1.5em;
        max-width: 480px;
		border: 1px solid #aaa;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding: 1em;
    }

    article.card > h2 {
        margin: 0;
        padding: 0;
    }

    article.card > div {
    }

    article.card p {
        margin: 0;
        padding: 0;
    }

    h1.red-mofo {
        color: red;
    }
</style>