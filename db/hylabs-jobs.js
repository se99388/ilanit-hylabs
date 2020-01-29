import {getRow} from './result';


export const addHylabsJobCandidate = ({firstName, lastName, email, phone, institute, graduationDate, studentJob, fullTimeJob, notes})=>{
    const sql = `INSERT INTO hylabs_jobs 
    (first_name,
    last_name,
    email,
    phone,
    institute,
graduation_date,
student_job,
full_time_job,
notes)
    VALUES
    ($1, $2, $3, $4,$5,$6,$7,$8,$9) RETURNING *`;
    return getRow(sql, firstName, lastName, email, phone, institute, graduationDate, studentJob, fullTimeJob, notes);
}
