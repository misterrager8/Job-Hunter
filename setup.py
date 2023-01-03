import setuptools

setuptools.setup(
    name="JobHunter",
    version="2.0.0",
    long_description=open("README.md").read(),
    license=open("LICENSE.md").read(),
    entry_points={"console_scripts": ["jobhunt=job_hunter.__main__:cli"]},
)
