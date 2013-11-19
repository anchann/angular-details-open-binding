angular-details-open-binding
============================

Angular two-way binding for the open attribute of the details HTML5 tag.

You'll need to add it as a dependency of your module, like this:
	angular.module("yourModule", [..., "detailsOpenBinding"])

Then add the js file in index.html (or load it however else you like), and
finally use it as in the following sample.

	<details open-binding="someFieldOnTheScope">
		<summary>foo</summary>
		More foo...
	</details>

