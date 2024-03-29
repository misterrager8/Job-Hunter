function Navbar() {
	const [theme, setTheme] = React.useState(localStorage.getItem('JobHunter'));

	const setThemeAs = (theme_) => {
		localStorage.setItem('JobHunter', theme_);
		document.documentElement.setAttribute('data-theme', theme_);
		setTheme(theme_);
	}

	const switchTheme = () => {
		let theme_ = theme === 'light' ? 'dark' : 'light';
		setThemeAs(theme_);
	}

	React.useEffect(() => {
		setThemeAs(theme);
	}, []);

	return (
		<nav className="navbar navbar-expand-lg sticky-top">
			<div className="container-fluid">
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav me-auto">
						<li className="nav-item">
							<a onClick={switchTheme} className="nav-link"><i className={'bi bi-' + (theme === 'light' ? 'moon' : 'sun') + '-fill'}></i> {theme === 'light' ? 'Dark' : 'Light'}</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		);
}

function CreateJobForm() {
	const createJob = (e) => {
		e.preventDefault();
		$.post('/create_job', {
			url: $('#url').val()
		}, function(data) {
			window.location.reload();
		});
	}

	return (
		<form className="input-group input-group-sm" onSubmit={(e) => createJob(e)}>
			<input autoComplete="off" className="form-control" placeholder="New Job" id="url" />
			<button type="submit" className="btn btn-outline-success">Add</button>
		</form>
		);
}

function JobList() {
	const [jobs, setJobs] = React.useState([]);

	React.useEffect(() => {
		$.get('/get_jobs', function(data) {
			setJobs(data.jobs_);
		});
	}, []);

	return (
		<div>
			{jobs.map((x, id) => <JobListItem key={id} job={x} /> )}
		</div>
		);
}

function JobListItem(props) {
	const [deleting, setDeleting] = React.useState(false);
	const [editing, setEditing] = React.useState(false);
	const [showNote, setShowNote] = React.useState(false);

	const toggleDelete = () => {
		setDeleting(!deleting);
	}

	const toggleShowNote = () => {
		setShowNote(!showNote);
	}

	const deleteJob = () => {
		$.get('/delete_job', {
			id: props.job.id
		}, function(data) {
			window.location.reload();
		});
	}

	const editJob = (e) => {
		e.preventDefault();
		$.post('/edit_job', {
			id: props.job.id,
			url: $('#url' + props.job.id).val(),
			status: $('#status' + props.job.id).val(),
			title: $('#title' + props.job.id).val(),
			organization: $('#org' + props.job.id).val(),
			notes: $('#notes' + props.job.id).val()
		}, function(data) {
			window.location.reload();
		});
	}

	const toggleEdit = () => {
		setEditing(!editing);
	}

	return (
		<div>
			<div className="row mb-1 p-1">
				<div className="col text-truncate">
					<a target="_blank" href={props.job.url}><i className="bi bi-link-45deg me-2"></i></a>
					<a title={props.job.title} onClick={toggleShowNote}>{props.job.title ? props.job.title : 'Job #' + props.job.id}</a>
				</div>
				<span className="col heading">{props.job.organization}</span>
				<div className="col text-muted fst-italic"><span className="small">{props.job.date_added}</span></div>
				<div className="col">
					<span className="status-badge" style={{ color:props.job.status_color, borderColor:props.job.status_color }}>{props.job.status}</span>
				</div>
				<div className="col">
					<div className="btn-group btn-group-sm float-end">
						<a onClick={toggleEdit} className="btn text-secondary"><i className="bi bi-pen"></i></a>
						{deleting && <a onClick={deleteJob} className="btn text-danger">Delete?</a>}
						<a onClick={toggleDelete} className="btn text-danger"><i className="bi bi-trash2"></i></a>
					</div>
				</div>
			</div>
			{showNote && <div className="mb-5 px-5 fst-italic" style={{ whiteSpace:'pre-wrap' }}>{props.job.notes}</div>}
			{editing && <form onSubmit={(e) => editJob(e)} className="mb-5">
				<input id={'url' + props.job.id} autoComplete="off" className="form-control form-control-sm mb-2" defaultValue={props.job.url} />
				<select id={'status' + props.job.id} className="form-control form-control-sm mb-2" defaultValue={props.job.status}>
					<option value="Pending">Pending</option>
					<option value="Stale">Stale</option>
					<option value="Followed Up">Followed Up</option>
					<option value="Rejected">Rejected</option>
				</select>
				<input autoComplete="off" className="form-control form-control-sm mb-2" id={'title' + props.job.id} placeholder="Title" defaultValue={props.job.title} />
				<input autoComplete="off" className="form-control form-control-sm mb-2" id={'org' + props.job.id} placeholder="Organization" defaultValue={props.job.organization} />
				<textarea rows="10" className="form-control form-control-sm mb-2" id={'notes' + props.job.id} placeholder="Notes" defaultValue={props.job.notes} />
				<button type="submit" className="btn btn-sm btn-outline-secondary w-100">Edit</button>
			</form>}
		</div>
		);
}

function App() {
	return (
		<div className="p-4">
			<Navbar/>
			<div className="mt-3">
				<CreateJobForm/>
				<div className="mt-3"><JobList/></div>
			</div>
		</div>
		);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
