using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using SSV2.Models;

namespace SSV2.Controllers
{
    [RoutePrefix("api/Personas")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PersonasController : ApiController
    {
        private SSDBV2Container db = new SSDBV2Container();
        [Route("ConsultarTodo")]
        [HttpGet]
        // GET: api/Personas
        public IQueryable<Persona> GetPersonas()
        {

            return db.Personas;
        }
        [Route("ConsultarMultitabla")]
        [HttpGet]
        // GET: api/Personas
        public IQueryable GetMultitablaPersona()
        {

            
            var lst = (
                  from per in db.Personas
                  join td in db.TDocs on per.TDoc_Id equals td.Id
                  join tp in db.TipoPersonas on per.Tp_Id equals tp.Id
                  //join pm in db.PersonaMaterias on per.Id equals pm.Persona_Id
                  //join m in db.Materias on pm.Materia_Id equals m.Id
                  where per.Tp_Id == 1
                  select new
                  {
                      Id = per.Id,
                      Nombre = per.Nombres,
                      Apellidos = per.Apellidos,
                      Tipodedocumento = td.Tipo,
                      NumeroDocumento = per.NDoc,
                      Tipodepersona = tp.Rol,
                      Activo = per.Activo,
                      Materias = (from PM in db.PersonaMaterias
                                  join NM in db.Materias on PM.Materia_Id equals NM.Id
                                  //join N in db.NotasMaterias on PM.Notas_Materias_Id equals N.Id
                                  where PM.Persona_Id == per.Id
                                  group NM by new { Id=NM.Id,Nombre=NM.Nombre} into newgroup
                                  select new{
                                        newgroup.Key.Id,
                                        newgroup.Key.Nombre,
                                        
                                        Notas=(from pm in db.PersonaMaterias join
                                                NMT in db.NotasMaterias on pm.Notas_Materias_Id equals NMT.Id join
                                               pr in db.Periodoes on NMT.Periodo_Id equals pr.Id
                                               where pm.Persona_Id == per.Id && pm.Materia_Id == newgroup.Key.Id
                                                select new { nota = NMT.Notas, periodo = pr.NombreP}
                                               )
                                  }
                                      
                                  ) 
                      //Notas = (from notmat in db.NotasMaterias
                      //         join permat in db.PersonaMaterias on notmat.Id equals permat.Notas_Materias_Id
                      //         join period in db.Periodoes on notmat.Periodo_Id equals period.Id
                      //         where permat.Persona_Id == per.Id && permat.Materia_Id == m.Id
                      //         select new { Notas = notmat.Notas, NombreP = period.NombreP, idPeriodo = period.Id,Idnota = notmat.Id ,IdPersona=per.Id}),
                      //Materia = m.Nombre,
                      //Materia_id = m.Id,
                      //Profesor = (from pro in db.Personas
                      //            join perma in db.PersonaMaterias on pro.Id equals perma.Persona_Id
                      //            where pro.Tp_Id == 2 && perma.Materia_Id == m.Id
                      //            select new { pro.Nombres })
                  });
            return lst;
        }

        // GET: api/Personas/5
        [ResponseType(typeof(Persona))]
        public IHttpActionResult GetPersona(int id)
        {
            var lst = (
                     from per in db.Personas
                     join td in db.TDocs on per.TDoc_Id equals td.Id
                     join tp in db.TipoPersonas on per.Tp_Id equals tp.Id
                     join pm in db.PersonaMaterias on per.Id equals pm.Persona_Id
                     join m in db.Materias on pm.Materia_Id equals m.Id
                     where per.Id == id
                     select new
                     {
                         Id = per.Id,
                         Nombre = per.Nombres,
                         Apellidos = per.Apellidos,
                         Tipodedocumento = td.Tipo,
                         NumeroDocumento = per.NDoc,
                         Tipodepersona = tp.Rol,
                         Activo = per.Activo,
                         Notas = (from notmat in db.NotasMaterias
                                  join permat in db.PersonaMaterias on notmat.Id equals permat.Notas_Materias_Id
                                  join period in db.Periodoes on notmat.Periodo_Id equals period.Id
                                  where permat.Persona_Id == per.Id && permat.Materia_Id == m.Id
                                  select new { Notas = notmat.Notas, NombreP = period.NombreP, Idnota = notmat.Id, Porcentaje=period.Porcentaje }),
                         Materia = m.Nombre,
                         Materia_id = m.Id,
                         Profesor = (from pro in db.Personas
                                     join perma in db.PersonaMaterias on pro.Id equals perma.Persona_Id
                                     where pro.Tp_Id == 2 && perma.Materia_Id == m.Id
                                     select new { pro.Nombres })
                     });
            return Ok(lst);
        }

        // PUT: api/Personas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPersona(int id, Persona persona)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != persona.Id)
            {
                return BadRequest();
            }

            db.Entry(persona).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Personas
        [ResponseType(typeof(Persona))]
        public IHttpActionResult PostPersona(Persona persona)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.Personas.Add(persona);
                db.SaveChanges();
            }
            catch (Exception e) {
                return  BadRequest("ERROR");
            }
           

            return CreatedAtRoute("DefaultApi", new { id = persona.Id }, persona);
        }

        // DELETE: api/Personas/5
        [ResponseType(typeof(Persona))]
        public IHttpActionResult DeletePersona(int id)
        {
            Persona persona = db.Personas.Find(id);
            if (persona == null)
            {
                return NotFound();
            }

            db.Personas.Remove(persona);
            db.SaveChanges();

            return Ok(persona);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PersonaExists(int id)
        {
            return db.Personas.Count(e => e.Id == id) > 0;
        }


    }
}