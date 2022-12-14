---
layout: archive
title: "Research"
permalink: /publications/
author_profile: true
---

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

Here you can find information about the projects I have supported in research, and my personal projects in collaboration with some amazing researchers. 

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
